function Button(props) {
    return <button {...props}
        className="bg-slate-400 text-white px-4 py-2 rounded-md font-medium"
    >
        {props.children} 
    </button>
}

export default Button;

// props.children -> Responsável por inserir os valores que são inseridos entre as tags '<button>' 
// e '</button>'