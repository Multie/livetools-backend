/*
 *   Copyright (c) 2024 Malte Hering
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import { ILivetoolsServerConfig } from "livetools-plugin/backend/server";
import path from "path";

export class LivetoolsServerConfig implements ILivetoolsServerConfig {
    port_description: string = "the port of the backend";
    port: number;
    runtimePath: string;
    dataPath: string;

    constructor() {
        this.port = 4000;
        this.runtimePath = path.join(process.cwd());
        this.dataPath = path.join(this.runtimePath, "data");
    }
}
