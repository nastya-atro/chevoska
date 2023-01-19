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
          [
            {
              [OptionsToolbarInline.Color]: [
                '#ffffff',
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
              ],
            },
            { [OptionsToolbarInline.Background_Color]: [] },
          ],

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
