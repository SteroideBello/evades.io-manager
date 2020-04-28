import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { DARK_THEME } from "../../appearance/constants/darkTheme"
import { Button } from "../../form/components/Button"
import { InputContainer } from "../../form/components/InputContainer"
import { InputLabel } from "../../form/components/InputLabel"
import { MultilineTextInput } from "../../form/components/MultilineTextInput"
import { getMessageFromData } from "../../message/helpers/getMessageFromData"
import { useAutorun } from "../../state/hooks/useAutorun"
import { useStores } from "../../state/hooks/useStores"
import { parseMessage } from "../helpers/parseMessage"
import { stringifyMessage } from "../helpers/stringifyMessage"

const ErrorContainer = styled.div`
  margin: 10px 0 4px;
  padding: 8px 12px;

  background: ${({ theme }) => theme.accent.danger};
  border-radius: 3px;

  color: ${DARK_THEME.header.primary};
`

const Error = styled.div`
  padding: 4px 0;

  font-size: 14px;
  font-family: ${({ theme }) => theme.font.mono};
  line-height: 16px;
`

const CodeInput = styled(MultilineTextInput)`
  min-height: 240px;

  font-size: 14px;
  font-family: ${({ theme }) => theme.font.mono};
`

const SubmitButton = styled(Button)`
  margin: 8px 0 16px;
  align-self: flex-end;
`

export function JsonInput() {
  const { messageStore } = useStores()

  const [json, setJson] = useState(() =>
    stringifyMessage(messageStore.message.getMessageData()),
  )

  const lastMessageRef = useRef(json)
  useAutorun(() => {
    const newMessage = stringifyMessage(
      messageStore.message.getMessageData(),
      false,
    )

    if (newMessage !== lastMessageRef.current) {
      setJson(stringifyMessage(messageStore.message.getMessageData()))
      lastMessageRef.current = newMessage
    }
  })

  const [errors, setErrors] = useState<string[]>([])
  useEffect(() => {
    let { errors } = parseMessage(json)

    errors = errors.filter(
      error =>
        error !== '$: Expected one of following keys: "content", "embeds"',
    )

    setErrors(errors)
  }, [json])

  return (
    <InputContainer>
      <InputLabel htmlFor="json">JSON data</InputLabel>
      {errors.length > 0 && (
        <ErrorContainer>
          {errors.map(error => (
            <Error key={error}>{error}</Error>
          ))}
        </ErrorContainer>
      )}
      <CodeInput
        id="json"
        value={json}
        onChange={event => setJson(event.target.value)}
      />
      <SubmitButton
        disabled={errors.length > 0}
        onClick={() => {
          messageStore.message = getMessageFromData({
            ...parseMessage(json).message,
            files: messageStore.message.files,
          })
        }}
      >
        Apply JSON data
      </SubmitButton>
    </InputContainer>
  )
}
