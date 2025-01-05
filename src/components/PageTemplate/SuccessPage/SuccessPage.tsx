import React from "react";
import './SuccessPage.css';
import {ReactComponent as SuccessIcon} from "../../../assets/success.svg";


interface PageState extends React.PropsWithChildren {
    title?: string
}

const SuccessPage: React.FC<PageState> = ({title, children}) => {
    let titleComponent;
    if (title) {
        titleComponent = <p className='success-page-title'>
            {title}
        </p>
    }

    return (
        <div className='success-page'>
            <SuccessIcon className={`success-page-icon ${title ? 'titled' : ''}`}/>
            {titleComponent}

            {children}
        </div>
    )
}

export default SuccessPage;