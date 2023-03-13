import classes from './Modal.module.css'
import ReactDOM from 'react-dom';

const Backdrop = props => {
    return <div onClick={props.onClick} className={classes.backdrop}></div>
};

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}; 

const portalElemt = document.getElementById('overlays')

const Modal = props => {
    return <>
    {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, portalElemt)}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElemt)}
    </>

};

export default Modal; 

