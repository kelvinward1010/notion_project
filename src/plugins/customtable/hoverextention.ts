import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export const HoverExtension = Extension.create({
    name: 'hover',
    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('hover'),
                props: {
                    handleDOMEvents: {
                        mouseover(view, event) {
                            // Xác định vị trí của con trỏ chuột
                            const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });

                            // Kiểm tra xem con trỏ chuột có đang ở trên một ô bảng không
                            const node = pos ? view.state.doc.nodeAt(pos.pos) : null;
                            if (node && node.type.name === 'table') {
                                //console.log(node)
                                if(node.content.firstChild?.type.name == 'tableRow'){
                                    console.log('row')
                                }
                                if(node.content.firstChild?.content.firstChild?.type.name == 'tableCell'){
                                    console.log('cell')
                                }
                                // Thêm hàng hoặc cột tại vị trí hiện tại
                                // Bạn cần xác định cách thêm hàng hoặc cột dựa trên vị trí của con trỏ chuột
                                // Ví dụ: nếu con trỏ chuột ở gần biên phải của ô, thêm một cột, nếu nó ở gần biên dưới, thêm một hàng
                            }
                        },
                    },
                },
            }),
        ]
    },
})
