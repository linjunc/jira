import { Select } from "antd";
import { Raw } from "types";
// 继承 Select 身上的方法
type SelectProps = React.ComponentProps<typeof Select>
// 在 type 中定义公共类型
interface IdSelectProps extends Omit<SelectProps, 'value' | "onChange" | "options" | "defaultOptionName"> {
    value: Raw | null | undefined,
    // onChange 只能传入number
    onChange: (value?: number) => void,
    defaultOptionName?: string,
    options?: { name: string, id: number }[]
}
/**
 * @description: 
 * @param {IdSelectProps} props
 * onChange 只会回调 number 和 undefined 类型
 * @return {*}
 */
export const IsSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props
    return <Select
        value={toNumber(value)}
        onChange={value => onChange(toNumber(value) || undefined)}
        {...restProps}
    >
        {
            defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
        }
        {
            options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
        }
    </Select>
}
// 转化为数字类型
const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)
