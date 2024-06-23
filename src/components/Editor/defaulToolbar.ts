import bold from './images/bold.svg';
import italic from './images/italic.svg';
import underline from './images/underline.svg';
import strikethrough from './images/strikethrough.svg';
import monospace from './images/monospace.svg';
import ordered from './images/list-ordered.svg';
import unordered from './images/list-unordered.svg';
import undo from './images/undo.svg';
import redo from './images/redo.svg';

export enum ControlType {
  inline = 'inline', //内联样式
  blockType = 'blockType', //块类型
  list = 'list', //列表
  history = 'history', //历史
}

export enum InlineType {
  bold = 'bold', //粗体
  italic = 'italic', //斜体
  underline = 'underline', //下划线
  strikethrough = 'strikethrough', //删除线
  monospace = 'monospace', //等宽字体
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
}

export enum HistoryType {
  undo = 'undo',
  redo = 'redo',
}

type OptionType = {
  icon: any;
  title: string;
  className?: string;
};

export type DefaultToolbarType = {
  options: ControlType[];
  [ControlType.inline]: {
    options: InlineType[];
  } & {
    [key in InlineType]: OptionType;
  };
  [ControlType.blockType]: {
    options: BlockType[];
  };
  [ControlType.history]: {
    options: HistoryType[];
  } & {
    [key in HistoryType]: OptionType;
  };
  [ControlType.list]: {
    options: ListType[];
  } & {
    [key in ListType]: OptionType;
  };
};

const defaultToolbar: DefaultToolbarType = {
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
  },
  [ControlType.blockType]: {
    options: Object.values(BlockType),
  },
  [ControlType.list]: {
    options: Object.values(ListType),
    [ListType.unordered]: {
      icon: unordered,
      title: '无序列表',
    },
    [ListType.ordered]: {
      icon: ordered,
      title: '有序列表',
    },
  },
  [ControlType.history]: {
    options: Object.values(HistoryType),
    [HistoryType.undo]: { icon: undo, title: '撤销' },
    [HistoryType.redo]: { icon: redo, title: '前进' },
  },
};

export default defaultToolbar;
