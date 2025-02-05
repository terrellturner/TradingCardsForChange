import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import ContentContainer from './ContentContainer';

const ConfirmationPrompt = ({
    okText = 'Ok',
    cancelText = 'Cancel',
    onConfirmClick,
    onCancelClick,
    message = 'Default message!',
    setVisibility,
}) => {
    const main = document.getElementById('main');



    return (
        setVisibility && createPortal(
            <>
                <div className="fixed bottom-0 left-0 right-0 top-0 bg-newsletter-black bg-opacity-80"></div>
                <ContentContainer className="fixed left-1/2 top-1/2 z-50 flex h-2/3 -translate-x-1/2 -translate-y-1/2 flex-col space-y-8 overflow-scroll border-2 bg-newsletter-black md:h-auto md:w-2/5 md:overflow-hidden md:p-12">
                    <a>{message}</a>
                    <div className="flex flex-row justify-stretch space-x-2">
                        <button onClick={onCancelClick} className="grow rounded border border-ipa-beige p-3 font-bold">
                            {cancelText}
                        </button>
                        <button onClick={onConfirmClick} className="grow rounded bg-ipa-beige p-3 font-bold text-newsletter-black">
                            {okText}
                        </button>
                    </div>
                </ContentContainer>
            </>
            , main)
    )
};

export default ConfirmationPrompt;
