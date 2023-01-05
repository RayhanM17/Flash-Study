import { useState } from 'react'

function FlashcardFlip({flashcard}) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <div className="w-full flex align-center justify-center ">
            <div 
            onClick={handleClick} 
            className={`
                flip-card${isFlipped ? ' flipped' : ''}
                w-4/5 card card-rounded flex align-center justify-center min-h-[20rem]`
            }
            >
                    <div className="flip-card-front text-xl bg-neutral h-full w-full p-8">
                        {flashcard.frontText}
                    </div>
                    <div className="flip-card-back text-xl bg-base-300 h-full w-full p-8">
                        {flashcard.backText}
                    </div>
            </div>
        </div>
    )
}

export default FlashcardFlip