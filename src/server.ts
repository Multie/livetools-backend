import fs from "fs";
import path from "path";
import process from "process";
import { LivetoolsServerConfig } from "./config";
import express, { Express } from "express";
import { ILivetoolsServer } from "livetools-plugin/backend/server";
import { Logger, Roarr } from "roarr";
import { JsonObject } from "roarr/src/types";

import { LivetoolsPlugins } from "livetools-plugin/backend/plugins";
import { Sequelize, DataTypes } from "sequelize";

export class LivetoolsServer implements ILivetoolsServer {
    name: string;
    express: Express;

    logger: Logger<JsonObject>;

    plugins: LivetoolsPlugins;
    sequelize: Sequelize;

    constructor(public config: LivetoolsServerConfig) {
        this.name = "server";
        this.logger = Roarr.child({
            package: this.name, // this will be included in all logs
        });
        this.express = express();
        this.sequelize = new Sequelize({
            dialect: "sqlite",
            storage: path.join(this.config.dataPath, "database.db"),
        });
        this.plugins = new LivetoolsPlugins(this);
    }

    setup(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                this.logger.info("Setup start");

                await this.sequelize.authenticate().catch((err: Error) => {
                    throw new Error("Failed to connect to db" + err.message);
                });

                this.express.use(express.json());

                await this.plugins.setup().catch((err) => {
                    throw err;
                });

                this.logger.info("Setup finished");
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    run() {
        return new Promise<void>(async (resolve, reject) => {
            try {
                this.logger.info("Run start");

                this.express.listen(this.config.port, () => {
                    this.logger.info(
                        "Run finished, started on port:" + this.config.port
                    );
                    resolve();
                });
            } catch (err) {
                reject(err);
            }
        });
    }
}
