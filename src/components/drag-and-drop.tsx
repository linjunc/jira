// 实现拖拽的组件
import { Droppable, DroppableProps, DroppableProvided, DroppableProvidedProps, DraggableProps, Draggable } from 'react-beautiful-dnd'
import React, { ReactNode } from 'react';
// 这个文件相当于重构了 drop 原生组件
// 定义一个类型，不想用 自带的 children ，采用自己的
type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode }
export const Drop = ({ children, ...props }: DropProps) => {
    return <Droppable {...props}>
        {
            (provided => {
                if (React.isValidElement(children)) {
                    // 给所有的子元素都加上props属性
                    return React.cloneElement(children, {
                        ...provided.droppableProps,
                        ref: provided.innerRef,
                        provided
                    })
                }
                return <div />
            })
        }
    </Droppable>
}
// 这个组件用来给 drop 组件做儿子的，需要用上 drop 的类型
// 通过forward来转发ref，这样就能添加 ref 属性在标签上
// 定义 ref 的泛型
type DropChildProps = Partial<{ provided: DroppableProvided } & DroppableProvidedProps> & React.HtmlHTMLAttributes<HTMLDivElement>
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(({ children, ...props }, ref) =>
    <div ref={ref} {...props}>
        {children}
        {/* api要求加的 */}
        {props.provided?.placeholder}
    </div>
)
// 拽
type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode }
export const Drag = ({ children, ...props }: DragProps) => {
    return <Draggable {...props}>
        {
            provided => {
                if (React.isValidElement(children)) {
                    return React.cloneElement(children, {
                        ...provided.draggableProps,
                        ...provided.dragHandleProps,
                        ref: provided.innerRef
                    })
                }
                return <div />
            }
        }
    </Draggable>
}