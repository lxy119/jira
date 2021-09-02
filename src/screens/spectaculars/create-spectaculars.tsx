import React, { useState } from "react";
import { useAddSpectaculars } from "utils/spectaculars";
import { Input } from "antd";
import { useProjectIdInUrl, useSpectacularsQueryKey } from "./util";
import { Container } from "screens/spectaculars/spectaculars-column";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddSpectaculars(useSpectacularsQueryKey());

  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        size={"large"}
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
