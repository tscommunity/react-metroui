import "./assets/metroui/css/metro-all.css";
import "./assets/styles/App.scss";

import * as React from "react";
import { hot } from "react-hot-loader";
import Button, {
  IconButton,
  OutlineButton,
  ImageButton,
  SquareButton,
  CycleButton,
  ShadowButton,
  FlatButton,
  CommandButton,
  ShortcutButton,
  ToolButton,
  DropdownButton,
  SplitDropdownButton
} from "./components/containers/Buttons";
import Toolbar from "./components/containers/Toolbar";

const App = () => (
  <div>
    <fieldset>
      <legend>Base Buttons</legend>
      <Button text="Default" />
      <Button text="Primary" class="primary" />
      <Button text="Secondary" class="secondary" />
      <Button text="Success" class="success" />
      <Button text="Alert" class="alert" />
      <Button text="Warning" class="warning" />
      <Button text="Yellow" class="yellow" />
      <Button text="Info" class="info" />
      <Button text="Dark" class="dark" />
      <Button text="Light" class="light" />
      <Button text="Link" class="link" />
    </fieldset>

    <fieldset>
      <legend>Icon Buttons</legend>

      <IconButton text="Font" icon="mif-checkmark" />
      <IconButton icon="mif-users" />
      <IconButton img="https://metroui.org.ua/images/checkmark.png" />
      <IconButton img="https://metroui.org.ua/images/keycdn-logo.svg" />
    </fieldset>

    <fieldset>
      <legend>Outline Buttons</legend>

      <OutlineButton class="primary">Primary</OutlineButton>
      <OutlineButton class="secondary">Secondary</OutlineButton>
      <OutlineButton class="success">Success</OutlineButton>
      <OutlineButton class="alert">Alert</OutlineButton>
      <OutlineButton class="warning">Warning</OutlineButton>
      <OutlineButton class="info">Info</OutlineButton>
      <OutlineButton class="dark">Dark</OutlineButton>
      <OutlineButton class="yellow">Yellow</OutlineButton>
    </fieldset>

    <fieldset>
      <legend>Button Sizes</legend>

      <Button text="mini" class="primary" size="mini" />
      <Button text="small" class="primary" size="small" />
      <Button text="default" class="primary" size="default" />
      <Button text="Large Button" class="primary" size="large" />
      <OutlineButton text="mini" class="primary mini" />
      <OutlineButton text="Small" class="primary small secondary" />
      <OutlineButton text="Default" class="primary default success" />
      <OutlineButton text="Outline Large" class="primary large alert" />
    </fieldset>

    <fieldset>
      <legend>Rounded Corners</legend>

      <Button text="mini" class="primary mini" round={true} />
      <Button text="small" class="primary small" round={true} />
      <Button text="default" class="primary default" round={true} />
      <Button text="Large Button" class="primary large" round={true} />
      <OutlineButton text="mini" class="primary mini" round={true} />
      <OutlineButton
        text="Small"
        class="primary small secondary"
        round={true}
      />
      <OutlineButton
        text="Default"
        class="primary default success"
        round={true}
      />
      <OutlineButton
        text="Outline Large"
        class="primary large alert"
        round={true}
      />
    </fieldset>

    <fieldset>
      <legend>Square & Circle Buttons</legend>

      <section>
        <SquareButton icon="mif-checkmark" class="mini primary" />
        <SquareButton icon="mif-checkmark" class="small primary" />
        <SquareButton icon="mif-checkmark" class="default primary" />
        <SquareButton icon="mif-checkmark" class="large primary" />

        <CycleButton icon="mif-checkmark" class="mini primary" />
        <CycleButton icon="mif-checkmark" class="small primary" />
        <CycleButton icon="mif-checkmark" class="default primary" />
        <CycleButton icon="mif-checkmark" class="large primary" />
      </section>

      <section>
        <SquareButton icon="mif-download" class="mini primary outline" />
        <SquareButton icon="mif-download" class="small primary outline" />
        <SquareButton icon="mif-download" class="default primary outline" />
        <SquareButton icon="mif-download" class="large success outline" />

        <CycleButton icon="mif-play" class="mini secondary outline" />
        <CycleButton icon="mif-play" class="small warning outline" />
        <CycleButton icon="mif-play" class="default dark outline" />
        <CycleButton icon="mif-checkmark" class="large info outline" />
      </section>

      <section>
        <SquareButton icon="mif-download" class="mini primary" round={true} />
        <SquareButton icon="mif-download" class="small primary" round={true} />
        <SquareButton
          icon="mif-download"
          class="default primary"
          round={true}
        />
        <SquareButton icon="mif-download" class="large success" round={true} />

        <SquareButton
          icon="mif-download"
          class="mini primary outline"
          round={true}
        />
        <SquareButton
          icon="mif-download"
          class="small primary outline"
          round={true}
        />
        <SquareButton
          icon="mif-download"
          class="default primary outline"
          round={true}
        />
        <SquareButton
          icon="mif-download"
          class="large success outline"
          round={true}
        />
      </section>
    </fieldset>

    <fieldset>
      <legend>Shadowed Button</legend>

      <ShadowButton text="Default" />
      <ShadowButton text="Primary" class="primary" />
      <ShadowButton text="Secondary" class="secondary" />
      <ShadowButton text="Success" class="success" />
      <ShadowButton text="Alert" class="alert" />
      <ShadowButton text="Warning" class="warning" />
      <ShadowButton text="Yellow" class="yellow" />
      <ShadowButton text="Info" class="info" />
      <ShadowButton text="Dark" class="dark" />
      <ShadowButton text="Light" class="light" />
    </fieldset>

    <fieldset>
      <legend>Flat Button</legend>

      <FlatButton text="Flat Button" />
    </fieldset>

    <fieldset>
      <legend>Command Button</legend>

      <CommandButton
        icon="mif-share"
        caption="Yes, Share and connect"
        text="Use this option for home or work"
      />
      <CommandButton
        icon="mif-share"
        class="primary"
        caption="Yes, Share and connect"
        text="Use this option for home or work"
      />
      <CommandButton
        icon="mif-share"
        class="primary outline"
        round={true}
        caption="Yes, Share and connect"
        text="Use this option for home or work"
      />
      <CommandButton
        icon="mif-share"
        iconPos="right"
        class="alert"
        round={true}
        caption="Yes, Share and connect"
        text="Use this option for home or work"
      />
    </fieldset>

    <fieldset>
      <legend>Image Button</legend>

      <section>
        <ImageButton caption="Share it" icon="mif-share" />
        <ImageButton caption="Share it" icon="mif-share" iconPos="right" />
      </section>

      <section>
        <ImageButton caption="Share it" icon="mif-share" class="primary" />
        <ImageButton caption="Share it" icon="mif-share" class="secondary" />
        <ImageButton caption="Share it" icon="mif-share" class="success" />
        <ImageButton caption="Share it" icon="mif-share" class="warning" />
        <ImageButton caption="Share it" icon="mif-share" class="alert" />
        <ImageButton caption="Share it" icon="mif-share" class="info" />
      </section>

      <section>
        <ImageButton
          caption="Share it"
          icon="mif-share"
          class="primary outline"
        />
        <ImageButton
          caption="Share it"
          icon="mif-share"
          class="secondary outline"
        />
        <ImageButton
          caption="Share it"
          icon="mif-share"
          class="success outline"
        />
        <ImageButton
          caption="Share it"
          icon="mif-share"
          class="warning outline"
        />
        <ImageButton
          caption="Share it"
          icon="mif-share"
          class="alert outline"
        />
        <ImageButton caption="Share it" icon="mif-share" class="info outline" />
      </section>
    </fieldset>

    <fieldset>
      <legend>Shortcut Button</legend>

      <ShortcutButton icon="mif-rocket" caption="Rocket" />
      <ShortcutButton
        icon="mif-rocket"
        caption="Rocket"
        tag="10"
        class="primary"
      />
      <ShortcutButton
        icon="mif-rocket"
        caption="Rocket"
        tag="10"
        class="secondary"
        outline={true}
      />
      <ShortcutButton
        icon="mif-rocket"
        caption="Rocket"
        tag="10"
        class="alert"
        round={true}
      />
      <ShortcutButton
        img="https://metroui.org.ua/images/checkmark.png"
        caption="Rocket"
        tag="10"
        class="alert"
        round={true}
      />
      <ShortcutButton icon="mif-rocket" class="warning" />
      <ShortcutButton
        icon="mif-rocket"
        tag="10"
        class="info"
        outline={true}
        round={true}
      />
    </fieldset>

    <fieldset>
      <legend>Toolbar</legend>

      <Toolbar>
        <ToolButton icon="mif-floppy-disk" />
        <ToolButton img="https://metroui.org.ua/images/checkmark.png" />
        <ToolButton text="open" />
      </Toolbar>
      <Toolbar>
        <ToolButton icon="mif-floppy-disk" class="primary" />
        <ToolButton icon="mif-printer" class="info" />
        <ToolButton text="open" />
      </Toolbar>
      <Toolbar>
        <ToolButton icon="mif-floppy-disk" class="primary outline" />
        <ToolButton icon="mif-printer" class="info outline" />
        <ToolButton text="open" class="outline" />
      </Toolbar>
      <Toolbar>
        <ToolButton icon="mif-floppy-disk" class="primary" round={true} />
        <ToolButton icon="mif-printer" class="info " round={true} />
        <ToolButton text="open" round={true} />
      </Toolbar>
    </fieldset>

    <fieldset>
      <legend>Dropdown Button</legend>

      <DropdownButton
        text="Dropdown Button"
        size="large"
        menus={[
          { text: "Reply" },
          { text: "Reply All" },
          { text: "Forward", onClick: () => console.log("Menu clicked.") }
        ]}
      />
      <SplitDropdownButton
        onClick={() => console.log("Split dropdown clicked.")}
        text="Split Button"
        menus={[
          { text: "Reply" },
          { text: "Reply All" },
          { text: "Forward", onClick: () => console.log("Menu clicked.") }
        ]}
      />
    </fieldset>

    <div style={{ height: 100 }} />
  </div>
);

export default hot(module)(App);
