import bold from './images/bold.svg';
import italic from './images/italic.svg';
import underline from './images/underline.svg';
import strikethrough from './images/strikethrough.svg';
import monospace from './images/monospace.svg';
import fontSize from './images/font-size.svg';
import indent from './images/indent.svg';
import outdent from './images/outdent.svg';
import ordered from './images/list-ordered.svg';
import unordered from './images/list-unordered.svg';
import left from './images/align-left.svg';
import center from './images/align-center.svg';
import right from './images/align-right.svg';
import justify from './images/align-justify.svg';
import color from './images/color.svg';
import eraser from './images/eraser.svg';
import link from './images/link.svg';
import unlink from './images/unlink.svg';
import emoji from './images/emoji.svg';
import embedded from './images/embedded.svg';
import image from './images/image.svg';
import undo from './images/undo.svg';
import redo from './images/redo.svg';
import subscript from './images/subscript.svg';
import superscript from './images/superscript.svg';

export enum ControlType {
  inline = 'inline', //内联样式
  blockType = 'blockType', //块类型
  // fontSize = 'fontSize', //字体大小
  // fontFamily = 'fontFamily', //字体
  list = 'list', //列表
  // textAlign = 'textAlign', //对齐方式
  // colorPicker = 'colorPicker', //颜色
  // link = 'link', //链接
  // embedded = 'embedded', //媒体
  // emoji = 'emoji', //表情
  // image = 'image', //图片
  // remove = 'remove', //删除
  history = 'history', //历史
}

export enum InlineType {
  bold = 'bold', //粗体
  italic = 'italic', //斜体
  underline = 'underline', //下划线
  strikethrough = 'strikethrough', //删除线
  monospace = 'monospace', //等宽字体
  // superscript = 'superscript', //上标
  // subscript = 'subscript', //下标
}

export enum BlockType {
  Normal = 'Normal',
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  H5 = 'H5',
  H6 = 'H6',
  Blockquote = 'Blockquote',
  Code = 'Code',
}

export enum ListType {
  unordered = 'unordered', //项目符号
  ordered = 'ordered', //编号
  // indent = 'indent', //增加缩进量
  // outdent = 'outdent', //减少缩进量
}

export enum HistoryType {
  undo = 'undo',
  redo = 'redo',
}

const defaultToolbar = {
  options: Object.values(ControlType),
  [ControlType.inline]: {
    options: Object.values(InlineType),
    [InlineType.bold]: { icon: bold, className: undefined, title: '粗体' },
    [InlineType.italic]: {
      icon: italic,
      className: undefined,
      title: '斜体',
    },
    [InlineType.underline]: {
      icon: underline,
      className: undefined,
      title: '下划线',
    },
    [InlineType.strikethrough]: {
      icon: strikethrough,
      className: undefined,
      title: '删除线',
    },
    [InlineType.monospace]: {
      icon: monospace,
      className: undefined,
      title: '等宽字体',
    },
    // [InlineType.superscript]: {
    //   icon: superscript,
    //   className: undefined,
    //   title: '上标',
    // },
    // [InlineType.subscript]: {
    //   icon: subscript,
    //   className: undefined,
    //   title: '下标',
    // },
  },
  [ControlType.blockType]: {
    options: Object.values(BlockType),
    title: '块级样式',
  },
  // [ControlType.fontSize]: {
  //   icon: fontSize,
  //   options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
  //   className: undefined,
  //   component: undefined,
  //   dropdownClassName: undefined,
  //   title: undefined,
  // },
  // [ControlType.fontFamily]: {
  //   options: [
  //     'Arial',
  //     'Georgia',
  //     'Impact',
  //     'Tahoma',
  //     'Times New Roman',
  //     'Verdana',
  //   ],
  //   className: undefined,
  //   component: undefined,
  //   dropdownClassName: undefined,
  //   title: undefined,
  // },
  [ControlType.list]: {
    options: Object.values(ListType),
    [ListType.unordered]: {
      icon: unordered,
      title: undefined,
    },
    [ListType.ordered]: {
      icon: ordered,
      title: undefined,
    },
    title: undefined,
  },
  // [ControlType.textAlign]: {
  //   inDropdown: false,
  //   className: undefined,
  //   component: undefined,
  //   dropdownClassName: undefined,
  //   options: ['left', 'center', 'right', 'justify'],
  //   left: { icon: left, className: undefined, title: undefined },
  //   center: { icon: center, className: undefined, title: undefined },
  //   right: { icon: right, className: undefined, title: undefined },
  //   justify: { icon: justify, className: undefined, title: undefined },
  //   title: undefined,
  // },
  // [ControlType.colorPicker]: {
  //   icon: color,
  //   className: undefined,
  //   component: undefined,
  //   popupClassName: undefined,
  //   colors: [
  //     'rgb(97,189,109)',
  //     'rgb(26,188,156)',
  //     'rgb(84,172,210)',
  //     'rgb(44,130,201)',
  //     'rgb(147,101,184)',
  //     'rgb(71,85,119)',
  //     'rgb(204,204,204)',
  //     'rgb(65,168,95)',
  //     'rgb(0,168,133)',
  //     'rgb(61,142,185)',
  //     'rgb(41,105,176)',
  //     'rgb(85,57,130)',
  //     'rgb(40,50,78)',
  //     'rgb(0,0,0)',
  //     'rgb(247,218,100)',
  //     'rgb(251,160,38)',
  //     'rgb(235,107,86)',
  //     'rgb(226,80,65)',
  //     'rgb(163,143,132)',
  //     'rgb(239,239,239)',
  //     'rgb(255,255,255)',
  //     'rgb(250,197,28)',
  //     'rgb(243,121,52)',
  //     'rgb(209,72,65)',
  //     'rgb(184,49,47)',
  //     'rgb(124,112,107)',
  //     'rgb(209,213,216)',
  //   ],
  //   title: undefined,
  // },
  // [ControlType.link]: {
  //   inDropdown: false,
  //   className: undefined,
  //   component: undefined,
  //   popupClassName: undefined,
  //   dropdownClassName: undefined,
  //   showOpenOptionOnHover: true,
  //   defaultTargetOption: '_self',
  //   options: ['link', 'unlink'],
  //   link: { icon: link, className: undefined, title: undefined },
  //   unlink: { icon: unlink, className: undefined, title: undefined },
  //   linkCallback: undefined,
  // },
  // [ControlType.emoji]: {
  //   icon: emoji,
  //   className: undefined,
  //   component: undefined,
  //   popupClassName: undefined,
  //   emojis: [
  //     '😀',
  //     '😁',
  //     '😂',
  //     '😃',
  //     '😉',
  //     '😋',
  //     '😎',
  //     '😍',
  //     '😗',
  //     '🤗',
  //     '🤔',
  //     '😣',
  //     '😫',
  //     '😴',
  //     '😌',
  //     '🤓',
  //     '😛',
  //     '😜',
  //     '😠',
  //     '😇',
  //     '😷',
  //     '😈',
  //     '👻',
  //     '😺',
  //     '😸',
  //     '😹',
  //     '😻',
  //     '😼',
  //     '😽',
  //     '🙀',
  //     '🙈',
  //     '🙉',
  //     '🙊',
  //     '👼',
  //     '👮',
  //     '🕵',
  //     '💂',
  //     '👳',
  //     '🎅',
  //     '👸',
  //     '👰',
  //     '👲',
  //     '🙍',
  //     '🙇',
  //     '🚶',
  //     '🏃',
  //     '💃',
  //     '⛷',
  //     '🏂',
  //     '🏌',
  //     '🏄',
  //     '🚣',
  //     '🏊',
  //     '⛹',
  //     '🏋',
  //     '🚴',
  //     '👫',
  //     '💪',
  //     '👈',
  //     '👉',
  //     '👆',
  //     '🖕',
  //     '👇',
  //     '🖖',
  //     '🤘',
  //     '🖐',
  //     '👌',
  //     '👍',
  //     '👎',
  //     '✊',
  //     '👊',
  //     '👏',
  //     '🙌',
  //     '🙏',
  //     '🐵',
  //     '🐶',
  //     '🐇',
  //     '🐥',
  //     '🐸',
  //     '🐌',
  //     '🐛',
  //     '🐜',
  //     '🐝',
  //     '🍉',
  //     '🍄',
  //     '🍔',
  //     '🍤',
  //     '🍨',
  //     '🍪',
  //     '🎂',
  //     '🍰',
  //     '🍾',
  //     '🍷',
  //     '🍸',
  //     '🍺',
  //     '🌍',
  //     '🚑',
  //     '⏰',
  //     '🌙',
  //     '🌝',
  //     '🌞',
  //     '⭐',
  //     '🌟',
  //     '🌠',
  //     '🌨',
  //     '🌩',
  //     '⛄',
  //     '🔥',
  //     '🎄',
  //     '🎈',
  //     '🎉',
  //     '🎊',
  //     '🎁',
  //     '🎗',
  //     '🏀',
  //     '🏈',
  //     '🎲',
  //     '🔇',
  //     '🔈',
  //     '📣',
  //     '🔔',
  //     '🎵',
  //     '🎷',
  //     '💰',
  //     '🖊',
  //     '📅',
  //     '✅',
  //     '❎',
  //     '💯',
  //   ],
  //   title: undefined,
  // },
  // [ControlType.embedded]: {
  //   icon: embedded,
  //   className: undefined,
  //   component: undefined,
  //   popupClassName: undefined,
  //   embedCallback: undefined,
  //   defaultSize: {
  //     height: 'auto',
  //     width: 'auto',
  //   },
  //   title: undefined,
  // },
  // [ControlType.image]: {
  //   icon: image,
  //   className: undefined,
  //   component: undefined,
  //   popupClassName: undefined,
  //   urlEnabled: true,
  //   uploadEnabled: true,
  //   previewImage: false,
  //   alignmentEnabled: true,
  //   uploadCallback: undefined,
  //   inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
  //   alt: { present: false, mandatory: false },
  //   defaultSize: {
  //     height: 'auto',
  //     width: 'auto',
  //   },
  //   title: undefined,
  // },
  // [ControlType.remove]: {
  //   icon: eraser,
  //   className: undefined,
  //   component: undefined,
  //   title: undefined,
  // },
  [ControlType.history]: {
    options: Object.values(HistoryType),
    [HistoryType.undo]: { icon: undo, title: undefined },
    [HistoryType.redo]: { icon: redo, title: undefined },
  },
};

export default defaultToolbar;
