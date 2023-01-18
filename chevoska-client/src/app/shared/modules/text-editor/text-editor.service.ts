import { Injectable, OnDestroy } from '@angular/core';
import { OptionsToolbarBlock, OptionsToolbarEmbeds, OptionsToolbarInline } from './text-editor.constants';
import { QuillConfigModes, QuillConfigModule } from './text-editor.interface';

//TODO: If TextEditorService will store only config - decision needs to be reviewed

@Injectable({
  providedIn: 'root',
})
export class TextEditorService implements OnDestroy {
  quillConfig: QuillConfigModule;
  constructor() {
    this.quillConfig = {
      [QuillConfigModes.Toolbar]: {
        container: [
          [{ [OptionsToolbarBlock.Header]: [1, 2, 3, 4, 5, 6, false] }],
          [{ [OptionsToolbarInline.Font]: [] }],
          [OptionsToolbarInline.Bold, OptionsToolbarInline.Italic, OptionsToolbarInline.Underline], // toggled buttons
          [{ [OptionsToolbarBlock.List]: 'ordered' }, { [OptionsToolbarBlock.List]: 'bullet' }],
          // [OptionsToolbarInline.Strikethrough],
          [{ [OptionsToolbarBlock.Text_Alignment]: [] }],
          [OptionsToolbarInline.Link],
          // [OptionsToolbarBlock.Blockquote, OptionsToolbarBlock.Code_Bloc],
          // [OptionsToolbarInline.Inline_Code],
          // [
          //   {
          //     [OptionsToolbarInline.Size]: ['small', false, 'large', 'huge'],
          //   },
          // ],
          [{ [OptionsToolbarInline.Color]: [] }, { [OptionsToolbarInline.Background_Color]: [] }],

          // [{ [OptionsToolbarInline.Subscript]: 'sub' }, { [OptionsToolbarInline.Subscript]: 'super' }],
          // [{ [OptionsToolbarBlock.Indent]: '-1' }, { [OptionsToolbarBlock.Indent]: '+1' }],
          // [{ [OptionsToolbarBlock.Text_Direction]: 'rtl' }],
          [OptionsToolbarEmbeds.Clean_Button],
          // [OptionsToolbarEmbeds.Emoji],
          // [OptionsToolbarEmbeds.Formula],
          // [OptionsToolbarEmbeds.Image],
          // [OptionsToolbarEmbeds.Video],
        ],
        handlers: {},
      },
    };
  }

  ngOnDestroy(): void {}
}
