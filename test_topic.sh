mosquitto_pub -t 'shellies/shellyem3-E89F6D849180/announce' -m '{"id":"shellyem3-E89F6D849180","model":"SHEM-3","mac":"E89F6D849180","ip":"192.168.1.51","new_fw":false,"fw_ver":"20220324-123835/v1.11.8-3EM-fix-g0014dcb"}'
mosquitto_pub -t 'shellies/shellyem3-E89F6D849180/info' -m '{"wifi_sta":{"connected":true,"ssid":"ASUS","ip":"192.168.1.51","rssi":-63},"cloud":{"enabled":false,"connected":false},"mqtt":{"connected":true},"time":"","unixtime":0,"serial":1,"has_update":false,"mac":"E89F6D849180","cfg_changed_cnt":0,"actions_stats":{"skipped":0},"relays":[{"ison":false,"has_timer":false,"timer_started":0,"timer_duration":0,"timer_remaining":0,"overpower":false,"is_valid":true,"source":"input"}],"emeters":[{"power":0.00,"pf":-0.03,"current":0.01,"voltage":233.83,"is_valid":true,"total":0.0,"total_returned":0.0},{"power":0.00,"pf":0.00,"current":0.01,"voltage":0.12,"is_valid":true,"total":0.0,"total_returned":0.0},{"power":0.00,"pf":0.00,"current":0.01,"voltage":0.09,"is_valid":true,"total":0.0,"total_returned":0.0}],"total_power":0.00,"fs_mounted":true,"update":{"status":"unknown","has_update":false,"new_version":"","old_version":"20220324-123835/v1.11.8-3EM-fix-g0014dcb"},"ram_total":49440,"ram_free":30688,"fs_size":233681,"fs_free":157126,"uptime":6}'