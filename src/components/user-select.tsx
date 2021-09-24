// 抽象一个 userSelect 组件，用于组件复用
import { useUsers } from '../utils/user';
import { IdSelect } from './id-select';
export const UserSelect = (props:React.ComponentProps<typeof IdSelect>)=>{
    const {data:users} = useUsers()
    return <IdSelect options={users|| []} {...props}></IdSelect>
}