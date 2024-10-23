# @xiaoshop/cli

## Usage

```sh
┌   @xiaoshop/cli
│
■  Usage: cli <command> [options]
│
│  Options:
│    -d, --debug       display debug information.
│    -v, --version     display the current version.
│    -h, --help        display usage information.
│
│  Commands:
│    new <schematic>   generate a XiaoShop element.
│    migrate <action>  database migration.
│    help [command]    display help for command
│
│
└  Problem? https://github.com/moujinet/xiaoshop-monorepo/issues
```

### Generators

```sh
┌   @xiaoshop/cli
│
●  Usage: cli new [options] <schematic>
│
│  Generate a XiaoShop element.
│
│  Available schematics:
│  ┌────────────┬─────┬──────────────────────────────────┐
│  │ module     │ mo  │ Generate a new Module            │
│  │ domain     │ do  │ Generate a new Domain            │
│  │ model      │ m   │ Generate a new Model             │
│  │ controller │ c   │ Generate a new Controller        │
│  │ scheduler  │ sch │ Generate a new Scheduler Service │
│  │ setting    │ set │ Generate a new Setting file      │
│  └────────────┴─────┴──────────────────────────────────┘
│
│  Options:
│    -h, --help  display usage information.
│
│
└  Problem? https://github.com/moujinet/xiaoshop-monorepo/issues
```

### Migration

```sh
┌   @xiaoshop/cli
│
●  Usage: cli migrate [options] <action>
│
│  Database migration.
│
│  Available actions:
│  ┌──────────┬────┬───────────────────────────────────────────┐
│  │ create   │ c  │ Create a new Migration                    │
│  │ generate │ g  │ Generate migration from schema & settings │
│  │ revert   │ re │ Revert last migration                     │
│  │ run      │ r  │ Run all migrations                        │
│  └──────────┴────┴───────────────────────────────────────────┘
│
│  Options:
│    -h, --help  display usage information.
│
│
└  Problem? https://github.com/moujinet/xiaoshop-monorepo/issues
``
