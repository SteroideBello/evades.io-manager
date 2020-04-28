import React, { useState } from "react"
import styled, { css, useTheme } from "styled-components"
import { Editor } from "../../editor/components/Editor"
import { MessagePreview } from "../../preview/components/MessagePreview"

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`

const TabSwitcher = styled.div`
  display: flex;

  background: ${({ theme }) => theme.background.secondary};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

const Tab = styled.button.attrs({ type: "button" })<{ active: boolean }>`
  height: 40px;
  padding: 0 16px;

  background: none;
  border: solid transparent;
  border-width: 2px 0;
  border-radius: 0;

  font-weight: 500;
  font-size: 15px;
  color: ${({ theme }) => theme.header.primary};
  line-height: 38px;

  ${({ active }) =>
    active &&
    css`
      border-bottom-color: ${({ theme }) => theme.accent.primary};
    `}
`

const View = styled.main`
  display: flex;
  flex-direction: row-reverse;
  align-items: stretch;

  flex: 1;

  max-height: 100%;

  & > * {
    flex: 1;
  }

  ${({ theme }) =>
    theme.appearance.mobile &&
    css`
      margin: 40px 0 0;
      max-height: calc(100% - 40px);
    `}
`

export function Body() {
  const theme = useTheme()
  const { mobile } = theme.appearance

  const [activeTab, setActiveTab] = useState<"preview" | "editor">("preview")

  return (
    <Container>
      {mobile && (
        <TabSwitcher>
          <Tab
            active={activeTab === "editor"}
            onClick={() => setActiveTab("editor")}
          >
            Editor
          </Tab>
          <Tab
            active={activeTab === "preview"}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </Tab>
        </TabSwitcher>
      )}
      <View>
        {(!mobile || activeTab === "preview") && <MessagePreview />}
        {(!mobile || activeTab === "editor") && <Editor />}
      </View>
    </Container>
  )
}
