import { useEffect, useState } from 'react'
import { BiUserVoice } from 'react-icons/bi'

import { utilService } from '../../services/util.service'

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { msgService } from '../../services/notify.service'


export const Search = (props) => {
    const { cb, theme } = props
    const [text, setText] = useState('')
    const [isSpeaking, setIsSpeaking] = useState(false)
    const { transcript, resetTranscript } = useSpeechRecognition()

    useEffect(() => {
        SpeechRecognition.stopListening()
        return () => SpeechRecognition.stopListening()
    }, [])

    const onRecognition = async () => {
        if (isSpeaking) {
            SpeechRecognition.stopListening()
            msgService.notify('Voice recognition stoped!', theme)
        } else {
            SpeechRecognition.startListening({ continuous: true, language: 'English' })
            msgService.notify('Voice recognition activated!', theme)
        }
        setIsSpeaking(!isSpeaking)
    }

    const handleSearch = ({ target }) => {
        if (transcript) resetTranscript()
        const { value } = target
        setText(value)
    }

    const submit = (ev) => {
        ev.preventDefault()
        const elInput = document.querySelector('#search-place')

        if (!utilService.isEnglishChar(text || transcript)) {
            msgService.notify('Try in english letters', theme)
        } else if (utilService.isValidPlace(text || transcript) || (transcript || text)) {
            cb(text || transcript)
        }

        if (elInput.value) {
            setText('')
            resetTranscript()
            SpeechRecognition.stopListening()
        }
    }

    return (
        <section className="search-container">
            <form className="search-bar" onSubmit={submit}>
                <input type="text" placeholder="Search..." id="search-place"
                    onChange={handleSearch} value={text || transcript} />
                <div onClick={onRecognition}><BiUserVoice /></div>
            </form>
        </section>
    )
}