// Copyright 2021 Northern.tech AS
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

package config

import (
	"github.com/mendersoftware/mender-server/pkg/config"
)

const (
	// SettingListen is the config key for the listen address
	SettingListen = "listen"
	// SettingListenDefault is the default value for the listen address
	SettingListenDefault = ":8080"

	// SettingMongo is the config key for the mongo URL
	SettingMongo = "mongo_url"
	// SettingMongoDefault is the default value for the mongo URL
	SettingMongoDefault = "mongodb://mender-mongo:27017"

	// SettingDbName is the config key for the mongo database name
	SettingDbName = "mongo_dbname"
	// SettingDbNameDefault is the default value for the mongo database name
	SettingDbNameDefault = "deviceconfig"

	// SettingDbSSL is the config key for the mongo SSL setting
	SettingDbSSL = "mongo_ssl"
	// SettingDbSSLDefault is the default value for the mongo SSL setting
	SettingDbSSLDefault = false

	// SettingDbSSLSkipVerify is the config key for the mongo SSL skip verify setting
	SettingDbSSLSkipVerify = "mongo_ssl_skipverify"
	// SettingDbSSLSkipVerifyDefault is the default value for the mongo SSL skip verify setting
	SettingDbSSLSkipVerifyDefault = false

	// SettingDbUsername is the config key for the mongo username
	SettingDbUsername = "mongo_username"

	// SettingDbPassword is the config key for the mongo password
	SettingDbPassword = "mongo_password"

	// SettingDebugLog is the config key for the turning on the debug log
	SettingDebugLog = "debug_log"
	// SettingDebugLogDefault is the default value for the debug log enabling
	SettingDebugLogDefault = false

	// SettingInventoryURL is the config key for the inventory uri
	SettingInventoryURL = "inventory_uri"
	// SettingInventoryURLDefault is the default value for the inventory uri
	SettingInventoryURLDefault = "http://mender-inventory:8080"

	// SettingInventoryTimeout is the config key for the inventory timeout
	SettingInventoryTimeout = "inventory_timeout"
	// SettingInventoryTimeoutDefault is the default value for the inventory timeout in seconds
	SettingInventoryTimeoutDefault = 10

	// SettingWorkflowsURL sets the base URL for the workflows orchestrator.
	SettingWorkflowsURL = "workflows_url"
	// SettingWorkflowsURLDefault sets the default workflows URL.
	SettingWorkflowsURLDefault = "http://mender-workflows-server:8080"

	// SettingEnableAudit enables auditing of configuration events.
	SettingEnableAudit        = "enable_audit"
	SettingEnableAuditDefault = false

	// Max Request body size
	SettingMaxRequestSize        = "request_size_limit"
	SettingMaxRequestSizeDefault = 1024 * 1024 // 1 MiB
)

var (
	// Defaults are the default configuration settings
	Defaults = []config.Default{
		{Key: SettingListen, Value: SettingListenDefault},
		{Key: SettingMongo, Value: SettingMongoDefault},
		{Key: SettingDbName, Value: SettingDbNameDefault},
		{Key: SettingDbSSL, Value: SettingDbSSLDefault},
		{Key: SettingDbSSLSkipVerify, Value: SettingDbSSLSkipVerifyDefault},
		{Key: SettingDebugLog, Value: SettingDebugLogDefault},
		{Key: SettingWorkflowsURL, Value: SettingWorkflowsURLDefault},
		{Key: SettingEnableAudit, Value: SettingEnableAuditDefault},
		{Key: SettingInventoryURL, Value: SettingInventoryURLDefault},
		{Key: SettingInventoryTimeout, Value: SettingInventoryTimeoutDefault},
		{Key: SettingMaxRequestSize, Value: SettingMaxRequestSizeDefault},
	}
)
