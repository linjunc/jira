import { Rate } from "antd";

// 收藏五角星模块
// 引用 antd 中的五角星
interface PinProps extends React.ComponentProps<typeof Rate> {
    checked: boolean;
    onCheckedChange?: (checked: boolean) => void
}
export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
    return <Rate
        // 一颗星
        count={1}
        value={checked ? 1 : 0}
        onChange={num => onCheckedChange?.(!!num)}
        {...restProps}
    />
}