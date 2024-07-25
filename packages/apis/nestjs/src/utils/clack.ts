import {
  cancel,
  confirm,
  group,
  intro,
  log,
  multiselect,
  note,
  outro,
  select,
  spinner,
} from '@clack/prompts'

export const clack = {
  intro,
  outro,
  note,
  group,
  select,
  multiselect,
  confirm,
  cancel,
  ...log,
  spinner: spinner(),
}
