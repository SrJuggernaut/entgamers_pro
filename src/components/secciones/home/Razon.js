import React from 'react';
import styled from '@emotion/styled'

const RazonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  min-height: 75vh;
`
const RazonContent = styled.div`

`
function Razon(props) {
  return (
    <RazonWrapper>
      <RazonContent className="container">
        razon
      </RazonContent>
    </RazonWrapper>
  );
}

export default Razon;
