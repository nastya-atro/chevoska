import { StringMap } from 'quill';

export enum QuillConfigModes {
  Emoji_Shortname = 'emoji-shortname',
  Emoji_Textarea = 'emoji-textarea',
  Emoji_Toolbar = 'emoji-toolbar',
  Toolbar = 'toolbar',
}

export interface QuillConfigModule {
  [QuillConfigModes.Toolbar]: StringMap;
}
