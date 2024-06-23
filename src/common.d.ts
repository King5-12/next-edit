declare global {
  enum EditType {
    inline = 'inline',
    blockType = 'blockType',
  }
  enum InlineType {
    bold = 'bold', //粗体
    italic = 'italic', //斜体
    underline = 'underline', //下划线
    strikethrough = 'strikethrough', //删除线
    monospace = 'monospace', //等宽字体
  }
  enum ControlType {
    inline = 'inline', //内联样式
    blockType = 'blockType', //块类型
    list = 'list', //列表
    history = 'history', //历史
  }
  enum BlockType {
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
  enum ListType {
    unordered = 'unordered', //项目符号
    ordered = 'ordered', //编号
  }

  enum HistoryType {
    undo = 'undo',
    redo = 'redo',
  }
  type EditItem = {
    key: string;
    type: EditType;
    inlineEdit?: {
      start?: number;
      end?: number;
      type: 'delete' | 'insert' | 'replace' | InlineType;
      newText?: string;
    };
    blockEdit?: {
      type: BlockType;
    };
  };
}
export default global;
