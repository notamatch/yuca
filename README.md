# Yuca

Tool to interact with MQTT events, helps to test devices/services that work over MQTT protocol.

# Installation

```
npm install -g yuca
```

# Usage

```
yuca --host test.mosquitto.org --topic /topic/to/test --message 'lpm'
yuca --host test.mosquitto.org --topic /topic/to/test --file /path/to/file.json
```

Use `yuca --help` to see option list.
