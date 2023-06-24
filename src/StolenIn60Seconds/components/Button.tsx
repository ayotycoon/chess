export function Button(props: any) {
    const style = {
        borderRadius: '5px',
        backgroundColor: 'rgba(73,110,83,255)',
        padding: '5px 25px',
            ...(props.style || {})
    }
    if(props.disabled){
        style.backgroundColor = undefined as any
    }
    return (
        <button  {...props} style={style} >
            {props.children}
        </button>
    )
}

export function UndoButton(props:any){
    return (
        <Button {...props}  style={{backgroundColor:'gray', padding:'5px', ...(props.style|| {})}} >
            <i className={'fa fa-undo'} style={{color: 'black', fontSize: '20px'}}/>
        </Button>
    )
}

export function GrabButton(props:any){
    const enabled = props.enabled;
    return (
        <Button {...props}  style={{backgroundColor:'gray', padding:'5px', ...(props.style|| {})}} >
            <i className={(!enabled?'fa-regular':'fa-solid')+' fa-hand'} style={{color: 'black', fontSize: '20px'}}/>
        </Button>
    )
}

export function CheckButton(props:any){
    return (
        <Button {...props}>
            <i className={'fa fa-check'} style={{color: props.disabled ?'gray':'#41874c', fontSize: '25px'}}/>
        </Button>
    )
}

export function CancelButton(props:any){
    return (
        <Button  {...props}>
            <i className={'fa fa-close'} style={{color: props.disabled ?'gray':'red', fontSize: '25px'}}/>
        </Button>
    )
}