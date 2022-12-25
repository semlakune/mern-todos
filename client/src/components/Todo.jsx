export default function Todo(props) {
    const {todo} = props
    return (
        <li className={"flex flex-row space-x-2 mt-2"}>
            <input type="checkbox" id={"check"}/>
            <label htmlFor="check">{todo?.task}
                <span className={"mx-3 p-1 px-2 rounded-lg bg-sky-300"}>{todo?.categoryName}</span>
                <span>
                    <button onClick={() => console.log(todo._id)}><i className="fa-duotone fa-trash-xmark text-red-800"></i></button>
                </span>
            </label>
        </li>
    )
}