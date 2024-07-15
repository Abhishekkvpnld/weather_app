import styled from "styled-components";

export const MainWrapper = styled.div`
  height: 100vh;
  background: linear-gradient(to right, #c7c7eb, #ccf2dd);
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    background-color: #ffffff7d;
    max-height: 95vh;
    border-radius: 12px;
    padding: 1.5rem;
    // position: relative;  
    box-shadow: 0 10px 15px rgb(0 0 0 / 20%);
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.8);
    background-blend-mode: overlay;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .searchArea {
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
  }

  .searchArea > input {
    outline: none;
    border: 1px solid grey;
    padding: 8px;
    border-radius: 20px;
    text-align: center;
    width: 80%;
    background: transparent;
  }

  .searchCircle {
    border: 1px solid grey;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .searchIcon {
      font-size: 15px;
      color: grey;
    }
  }

  .weatherArea {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 5px 0;

    .icon {
      font-size: 6rem;
    }

    h1 {
      font-size: 2rem;
      font-family: "Bebas Neue", sans-serif;
    }

    span {
      margin-bottom: 5px;
      font-family: "Inter", sans-serif;
    }

    h2 {
      font-size: 2rem;
      font-family: "Inter", sans-serif;
      font-weight: 400;
    }
  }

  .bottomInfoArea {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-family: "Josefin Sans", sans-serif;
    background: linear-gradient(
      90deg,
      rgba(243, 255, 253, 1) 0%,
      rgba(253, 255, 232, 1) 100%
    );
    border-radius: 12px;
    padding: 10px;
    width: 100%;
  }

  .humidityLevel,
  .wind {
    display: flex;
    align-items: center;
    margin: 0 20px;

    .humidIcon {
      font-size: 3rem;
    }
  }

  .windIcon {
    font-size: 3rem;
    margin-right: 10px;
  }

  .humidInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
    font-size:20px
    }
  }

  .loading {
    height: 400px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    .loadingIcon {
      font-size: 3rem;
      animation: spin 2s linear infinite;
    }

    p {
      font-size: 15px;
      font-family: "Josefin Sans", sans-serif;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
