import * as React from "react";
import { useTranslation } from "react-i18next";
import { MenuButton, useMenuState } from "reakit/Menu";
import styled from "styled-components";
import ContextMenu from "./ContextMenu";
import DelayedMount from "./DelayedMount";
import Input, { Props as InputProps } from "./Input";
import NudeButton from "./NudeButton";
import Relative from "./Sidebar/components/Relative";
import Text from "./Text";

type Props = Omit<InputProps, "onChange"> & {
  value: string | undefined;
  onChange: (value: string) => void;
};

const InputColor: React.FC<Props> = ({ value, onChange, ...rest }) => {
  const { t } = useTranslation();
  const menu = useMenuState({
    modal: true,
    placement: "bottom-end",
  });

  return (
    <Relative>
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="#"
        maxLength={7}
        {...rest}
      />
      <MenuButton {...menu}>
        {(props) => (
          <SwatchButton
            aria-label={t("Show menu")}
            {...props}
            $background={value}
          />
        )}
      </MenuButton>
      <ContextMenu {...menu} aria-label={t("Select a color")}>
        <React.Suspense
          fallback={
            <DelayedMount>
              <Text>{t("Loading")}…</Text>
            </DelayedMount>
          }
        >
          <StyledColorPicker
            disableAlpha
            color={value}
            onChange={(color) => onChange(color.hex)}
          />
        </React.Suspense>
      </ContextMenu>
    </Relative>
  );
};

const SwatchButton = styled(NudeButton)<{ $background: string | undefined }>`
  background: ${(props) => props.$background};
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 50%;
  position: absolute;
  bottom: 20px;
  right: 6px;
`;

const ColorPicker = React.lazy(
  () => import("react-color/lib/components/chrome/Chrome")
);

const StyledColorPicker = styled(ColorPicker)`
  background: inherit !important;
  box-shadow: none !important;
  border: 0 !important;
  border-radius: 0 !important;
  user-select: none;

  input {
    user-select: text;
    color: ${(props) => props.theme.text} !important;
  }
`;

export default InputColor;
