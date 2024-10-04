import React, { useContext } from 'react'
import { GlobalContext } from '@/context/GlobalState';
import SubmitButton from '@/ui/SubmitButton';

const ModalButton = ({btnText,btnClass,btnIcon}) => {
    const { modal,modalState } = useContext(GlobalContext);
    return (
        <SubmitButton text={btnText} classList={btnClass} icon={btnIcon} onClick={modalState} />
    )
}

export default ModalButton
