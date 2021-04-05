// Copyright 2021 TestProject (https://testproject.io)
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Capabilities, CreateSessionCapabilities } from 'selenium-webdriver';
import { Driver as ChromeDriver, Options } from 'selenium-webdriver/chrome';

import CustomHttpCommandExecutor from '../../internal/helpers/customCommandExecutor';
import Reporter from '../../internal/reporter/reporter';
import IBaseDriver from '../base/baseDriver';

/**
 * Chrome class that extend original chrome driver - implement ItenableBaseDriver using the BaseDriver
 * @property {CustomHttpCommandExecutor} executer Extension of the Selenium Connection (command_executor)
 */
class Chrome extends ChromeDriver implements IBaseDriver {
  private static executer: CustomHttpCommandExecutor;

  private reporter!: Reporter;

  /**
   * Creates a new session with the Chrome.
   * @param {Options | CreateSessionCapabilities} opt_config Capabilities
   * @returns {Chrome}
   */
  static createSession(opt_config?: Options | CreateSessionCapabilities): Chrome {
    const caps = opt_config as Capabilities;
    const customCommandExecutor = new CustomHttpCommandExecutor(caps);
    Chrome.executer = customCommandExecutor;

    return super.createSession(caps, customCommandExecutor) as Chrome;
  }

  /**
   * Returns an object that has the option to create custom test and report
   * @returns {Reporter} - Instance of the TestProject Reporter
   */
  report(): Reporter {
    // Create new reporter instance if doesn't exists
    if (!this.reporter) {
      this.reporter = new Reporter(Chrome.executer);
    }

    return this.reporter;
  }
}

export default Chrome;