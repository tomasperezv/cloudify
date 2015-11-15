# cloudify
SSH connection manager

### Configuration

Create a `.cloudify.json` file in your `$HOME` folder with a structure similar to `config-example.json`.

For example:

```json
{
  "username": "test",
  "hosts":
  [
    {
      "id": "web",
      "name": "web-main",
      "domain": "0x101.com"
    }
  ],
  "jumphost": {
      "name": "jump1",
      "domain": "0x101.com"
  }
}
```

The previous example is defining the configuration for a host `web-main.0x101.com` which can be referenced directly by its id `web`. You can add multiple hosts on the `hosts` section.

### List available hosts

```bash
$ cloudify list
```

### Connection to a host

```bash
$ cloudify [id]
```

It will run `ssh -A hostname` to the host defined in `cloudify.json` by its id, for example for the file defined in the Configuration section you might run `spcloudify web`.

### Connection to a host via a jumphost

The jumphosts are defined in the `jumphost` section, one they are defined you can use them directly in order to jump to any host by id.

```bash
$ cloudify jump a
```
