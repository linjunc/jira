// 用来实现搜索内容高亮
export const Mark = ({ name, keyword }: { name: string, keyword: string }) => {
    if (!keyword) {
        return <>{name}</>
    }
    const arr = name.split(keyword)
    return <>
        {
            arr.map((str, index) => <span key={index}>
                {str}
                {
                    index === arr.length - 1 ? null : <span style={{ color: 'skyblue' }}>{keyword}</span>
                }
            </span>
            )
        }
    </>
}