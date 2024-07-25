export const toolbar = {
  /**
   * 工具栏 (默认)
   */
  default: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block', { script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ color: [] }, { background: [] }, 'clean'],
  ],

  /**
   * 工具栏 (迷你)
   */
  mini: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['clean'],
  ],
}
