<template>
  <div>
    <v-layout
      style="background: linear-gradient(to right, rgb(29, 52, 70), rgb(25, 28, 31)); padding:0px;"
      justify-center
      align-center
      row
      wrap
    >
      <div style=" text-align:center; width:100%;">
        <v-layout justify-center align-center row wrap>
          <v-flex class="pl-intro" style="height:100%;" xs12 sm12 md6>
            <h1 class="custom-header" style="font-weight:400;">Auction Dapp</h1>
            <h3 class="custom-header" style="font-size:1.6em; font-weight:100;">
              Decentralized auction platform powered by Ethereum
            </h3>
            <br />
            <!-- <v-btn style="margin:0;" color="white"  large>
                            <v-icon style="color: red !important;" >import_contacts</v-icon>
                            <span style="margin-left:10px;     color: red;">Placeholder</span> 
                        </v-btn> -->
            <br />
            <br />
          </v-flex>
          <v-flex style="height:100%;" class="pl-intro-2" xs12 sm12 md6>
            <img
              style="width:300px;"
              src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzIwMCcgd2lkdGg9JzIwMCcgIGZpbGw9IiNCMzZBRTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggZD0iTTUwLDQ2LjljMCwwLjMsMC4yLDAuNSwwLjUsMC41YzAuMywwLDAuNS0wLjMsMC41LTAuNWMwLTAuMy0wLjItMC41LTAuNS0wLjVDNTAuMyw0Ni4zLDUwLDQ2LjUsNTAsNDYuOUw1MCw0Ni45eiI+PC9wYXRoPjxwYXRoIGQ9Ik01MCw0OC45YzAsMC4zLDAuMiwwLjUsMC41LDAuNWMwLjMsMCwwLjUtMC4zLDAuNS0wLjVjMC0wLjMtMC4yLTAuNS0wLjUtMC41QzUwLjMsNDguMyw1MCw0OC41LDUwLDQ4LjlMNTAsNDguOXoiPjwvcGF0aD48cGF0aCBkPSJNNTAuNSw0NS40YzAuMywwLDAuNS0wLjIsMC41LTAuNWMwLTAuMy0wLjItMC41LTAuNS0wLjVjLTAuMywwLTAuNSwwLjItMC41LDAuNXYwQzUwLDQ1LjIsNTAuMyw0NS40LDUwLjUsNDUuNHoiPjwvcGF0aD48cGF0aCBkPSJNMTguNyw2Ni4ybC02LjItNC4zYy0wLjItMC4xLTAuNC0wLjEtMC42LDBsLTYuMiw0LjNjLTAuMiwwLjEtMC4yLDAuMy0wLjIsMC40djYuN2MwLDAuMiwwLjEsMC4zLDAuMiwwLjRsNi4yLDQuMyAgIGMwLjEsMC4xLDAuMiwwLjEsMC4zLDAuMXMwLjIsMCwwLjMtMC4xbDYuMi00LjNjMC4xLTAuMSwwLjItMC4yLDAuMi0wLjR2LTYuN0MxOC45LDY2LjYsMTguOSw2Ni40LDE4LjcsNjYuMnogTTEyLjIsNjIuOWw1LjQsMy43ICAgbC01LjQsMy43bC01LjQtMy43TDEyLjIsNjIuOXogTTYuNCw2Ny42bDUuMiwzLjZ2NS41bC01LjItMy42VjY3LjZ6IE0xMi43LDc2Ljd2LTUuNWw1LjItMy42djUuNUwxMi43LDc2Ljd6Ij48L3BhdGg+PC9nPjxnPjxnPjxjaXJjbGUgY3g9IjEyLjIiIGN5PSI4NS4xIiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjEyLjIiIGN5PSI4My4xIiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjEyLjIiIGN5PSI4NyIgcj0iMC41Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSIxMi4yIiBjeT0iODkiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTQuMyIgY3k9Ijg5IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjE2LjMiIGN5PSI4OSIgcj0iMC41Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSIxOC40IiBjeT0iODkiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMjAuNCIgY3k9Ijg5IiByPSIwLjUiPjwvY2lyY2xlPjwvZz48Zz48Y2lyY2xlIGN4PSI1MC42IiBjeT0iODUiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTAuNiIgY3k9IjgzIiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjUwLjYiIGN5PSI4NyIgcj0iMC41Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSI1MC42IiBjeT0iODkiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNDguNSIgY3k9Ijg5IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjQ2LjUiIGN5PSI4OSIgcj0iMC41Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSI0NC40IiBjeT0iODkiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNDIuNCIgY3k9Ijg5IiByPSIwLjUiPjwvY2lyY2xlPjwvZz48L2c+PGc+PGc+PGNpcmNsZSBjeD0iMTIuMiIgY3k9IjU0LjgiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTIuMiIgY3k9IjU2LjgiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTIuMiIgY3k9IjUyLjgiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTIuMiIgY3k9IjUwLjgiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTQuMyIgY3k9IjUwLjgiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTYuMyIgY3k9IjUwLjgiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTguNCIgY3k9IjUwLjgiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMjAuNCIgY3k9IjUwLjgiIHI9IjAuNSI+PC9jaXJjbGU+PC9nPjxnPjxjaXJjbGUgY3g9IjUwLjYiIGN5PSI1NC45IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjUwLjYiIGN5PSI1Ni44IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjUwLjYiIGN5PSI1Mi45IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjUwLjUiIGN5PSI1MC45IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjQ4LjUiIGN5PSI1MC45IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjQ2LjQiIGN5PSI1MC45IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjQ0LjQiIGN5PSI1MC45IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjQyLjQiIGN5PSI1MC45IiByPSIwLjUiPjwvY2lyY2xlPjwvZz48L2c+PGc+PGc+PGNpcmNsZSBjeD0iNTAuNSIgY3k9IjQ2LjkiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTAuNSIgY3k9IjQ0LjkiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTAuNSIgY3k9IjQ4LjkiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTIuNiIgY3k9IjUwLjkiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTQuNiIgY3k9IjUwLjkiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTYuNyIgY3k9IjUwLjkiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTguNyIgY3k9IjUwLjkiIHI9IjAuNSI+PC9jaXJjbGU+PC9nPjxnPjxjaXJjbGUgY3g9Ijg4LjkiIGN5PSI0Ni45IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijg4LjkiIGN5PSI0NC45IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijg4LjkiIGN5PSI0OC44IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijg4LjkiIGN5PSI1MC44IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijg2LjgiIGN5PSI1MC44IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijg0LjgiIGN5PSI1MC44IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjgyLjciIGN5PSI1MC44IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjgwLjciIGN5PSI1MC44IiByPSIwLjUiPjwvY2lyY2xlPjwvZz48L2c+PGc+PGc+PGNpcmNsZSBjeD0iNTAuNSIgY3k9IjE2LjciIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTAuNSIgY3k9IjE4LjciIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTAuNSIgY3k9IjE0LjciIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTAuNSIgY3k9IjEyLjciIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTIuNiIgY3k9IjEyLjciIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTQuNiIgY3k9IjEyLjciIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTYuNyIgY3k9IjEyLjciIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTguNyIgY3k9IjEyLjciIHI9IjAuNSI+PC9jaXJjbGU+PC9nPjxnPjxjaXJjbGUgY3g9Ijg4LjkiIGN5PSIxNi43IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijg4LjgiIGN5PSIxOC43IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijg4LjgiIGN5PSIxNC44IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijg4LjgiIGN5PSIxMi44IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijg2LjgiIGN5PSIxMi44IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijg0LjciIGN5PSIxMi44IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjgyLjciIGN5PSIxMi44IiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjgwLjciIGN5PSIxMi44IiByPSIwLjUiPjwvY2lyY2xlPjwvZz48L2c+PHBhdGggZD0iTTM4LjIsNDYuOUwzMiw0Mi42Yy0wLjItMC4xLTAuNC0wLjEtMC42LDBsLTYuMiw0LjNDMjUsNDcsMjUsNDcuMiwyNSw0Ny4zVjU0YzAsMC4yLDAuMSwwLjMsMC4yLDAuNGw2LjIsNC4zICBjMC4xLDAuMSwwLjIsMC4xLDAuMywwLjFzMC4yLDAsMC4zLTAuMWw2LjItNC4zYzAuMS0wLjEsMC4yLTAuMiwwLjItMC40di02LjdDMzguNCw0Ny4yLDM4LjQsNDcsMzguMiw0Ni45eiBNMzEuNyw0My42bDUuNCwzLjcgIEwzMS43LDUxbC01LjQtMy43TDMxLjcsNDMuNnogTTI2LDQ4LjNsNS4yLDMuNnY1LjVMMjYsNTMuN1Y0OC4zeiBNMzIuMiw1Ny40di01LjVsNS4yLTMuNnY1LjVMMzIuMiw1Ny40eiI+PC9wYXRoPjxwYXRoIGQ9Ik01Ny4yLDY2LjJsLTYuMi00LjNjLTAuMi0wLjEtMC40LTAuMS0wLjYsMGwtNi4yLDQuM2MtMC4yLDAuMS0wLjIsMC4zLTAuMiwwLjR2Ni43YzAsMC4yLDAuMSwwLjMsMC4yLDAuNGw2LjIsNC4zICBjMC4xLDAuMSwwLjIsMC4xLDAuMywwLjFjMC4xLDAsMC4yLDAsMC4zLTAuMWw2LjItNC4zYzAuMS0wLjEsMC4yLTAuMiwwLjItMC40di02LjdDNTcuNCw2Ni42LDU3LjQsNjYuNCw1Ny4yLDY2LjJ6IE01MC42LDYyLjkgIGw1LjQsMy43bC01LjQsMy43bC01LjQtMy43TDUwLjYsNjIuOXogTTQ0LjksNjcuNmw1LjIsMy42djUuNWwtNS4yLTMuNlY2Ny42eiBNNTEuMSw3Ni43di01LjVsNS4yLTMuNnY1LjVMNTEuMSw3Ni43eiI+PC9wYXRoPjxwYXRoIGQ9Ik0zOC4yLDg1LjZMMzIsODEuMmMtMC4yLTAuMS0wLjQtMC4xLTAuNiwwbC02LjIsNC4zQzI1LDg1LjcsMjUsODUuOSwyNSw4NnY2LjdjMCwwLjIsMC4xLDAuMywwLjIsMC40bDYuMiw0LjMgIGMwLjEsMC4xLDAuMiwwLjEsMC4zLDAuMXMwLjIsMCwwLjMtMC4xbDYuMi00LjNjMC4xLTAuMSwwLjItMC4yLDAuMi0wLjRWODZDMzguNCw4NS45LDM4LjQsODUuNywzOC4yLDg1LjZ6IE0zMS43LDgyLjNsNS40LDMuNyAgbC01LjQsMy43TDI2LjMsODZMMzEuNyw4Mi4zeiBNMjYsODYuOWw1LjIsMy42Vjk2TDI2LDkyLjRWODYuOXogTTMyLjIsOTZ2LTUuNWw1LjItMy42djUuNUwzMi4yLDk2eiI+PC9wYXRoPjxwYXRoIGQ9Ik03Ni41LDQ3LjRMNzAuMyw0M2MtMC4yLTAuMS0wLjQtMC4xLTAuNiwwbC02LjIsNC4zYy0wLjIsMC4xLTAuMiwwLjMtMC4yLDAuNHY2LjdjMCwwLjIsMC4xLDAuMywwLjIsMC40bDYuMiw0LjMgIGMwLjEsMC4xLDAuMiwwLjEsMC4zLDAuMXMwLjIsMCwwLjMtMC4xbDYuMi00LjNjMC4xLTAuMSwwLjItMC4yLDAuMi0wLjR2LTYuN0M3Ni43LDQ3LjcsNzYuNyw0Ny41LDc2LjUsNDcuNHogTTcwLDQ0LjFsNS40LDMuNyAgTDcwLDUxLjVsLTUuNC0zLjdMNzAsNDQuMXogTTY0LjIsNDguN2w1LjIsMy42djUuNWwtNS4yLTMuNlY0OC43eiBNNzAuNSw1Ny45di01LjVsNS4yLTMuNnY1LjVMNzAuNSw1Ny45eiI+PC9wYXRoPjxwYXRoIGQ9Ik01NywyOGwtNi4yLTQuM2MtMC4yLTAuMS0wLjQtMC4xLTAuNiwwTDQzLjksMjhjLTAuMiwwLjEtMC4yLDAuMy0wLjIsMC40djYuN2MwLDAuMiwwLjEsMC4zLDAuMiwwLjRsNi4yLDQuMyAgYzAuMSwwLjEsMC4yLDAuMSwwLjMsMC4xYzAuMSwwLDAuMiwwLDAuMy0wLjFsNi4yLTQuM2MwLjEtMC4xLDAuMi0wLjIsMC4yLTAuNHYtNi43QzU3LjIsMjguNCw1Ny4yLDI4LjIsNTcsMjh6IE01MC41LDI0LjdsNS40LDMuNyAgbC01LjQsMy43bC01LjQtMy43TDUwLjUsMjQuN3ogTTQ0LjcsMjkuNEw1MCwzM3Y1LjVsLTUuMi0zLjZWMjkuNHogTTUxLDM4LjVWMzNsNS4yLTMuNnY1LjVMNTEsMzguNXoiPjwvcGF0aD48cGF0aCBkPSJNOTUuNSwyOGwtNi4yLTQuM2MtMC4yLTAuMS0wLjQtMC4xLTAuNiwwTDgyLjQsMjhjLTAuMiwwLjEtMC4yLDAuMy0wLjIsMC40djYuN2MwLDAuMiwwLjEsMC4zLDAuMiwwLjRsNi4yLDQuMyAgYzAuMSwwLjEsMC4yLDAuMSwwLjMsMC4xYzAuMSwwLDAuMiwwLDAuMy0wLjFsNi4yLTQuM2MwLjEtMC4xLDAuMi0wLjIsMC4yLTAuNHYtNi43Qzk1LjcsMjguNCw5NS43LDI4LjIsOTUuNSwyOHogTTg4LjksMjQuNyAgbDUuNCwzLjdsLTUuNCwzLjdsLTUuNC0zLjdMODguOSwyNC43eiBNODMuMiwyOS40bDUuMiwzLjZ2NS41bC01LjItMy42VjI5LjR6IE04OS40LDM4LjVWMzNsNS4yLTMuNnY1LjVMODkuNCwzOC41eiI+PC9wYXRoPjxwYXRoIGQ9Ik03Ni41LDguN2wtNi4yLTQuM2MtMC4yLTAuMS0wLjQtMC4xLTAuNiwwbC02LjIsNC4zYy0wLjIsMC4xLTAuMiwwLjMtMC4yLDAuNHY2LjdjMCwwLjIsMC4xLDAuMywwLjIsMC40bDYuMiw0LjMgIGMwLjEsMC4xLDAuMiwwLjEsMC4zLDAuMWMwLjEsMCwwLjIsMCwwLjMtMC4xbDYuMi00LjNjMC4xLTAuMSwwLjItMC4yLDAuMi0wLjRWOS4xQzc2LjcsOSw3Ni43LDguOCw3Ni41LDguN3ogTTcwLDUuNGw1LjQsMy43ICBMNzAsMTIuOGwtNS40LTMuN0w3MCw1LjR6IE02NC4yLDEwLjFsNS4yLDMuNnY1LjVsLTUuMi0zLjZWMTAuMXogTTcwLjUsMTkuMnYtNS41bDUuMi0zLjZ2NS41TDcwLjUsMTkuMnoiPjwvcGF0aD48L3N2Zz4="
            />
          </v-flex>
        </v-layout>
      </div>
    </v-layout>
    <v-layout
      v-show="!metamaskInstalled"
      style="background-color: #F44336; color: white; padding: 25px; text-align: center;"
      justify-center
      align-center
      row
      wrap
    >
      <v-flex style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
        <h1 style="color:#fff;margin-bottom: 20px; line-height: 32px;">
          Metamask was not detected!
        </h1>
      </v-flex>
    </v-layout>
    <v-layout
      v-show="metamaskInstalled"
      style=" color: white; padding: 25px; text-align: center;"
      justify-center
      align-center
      row
      wrap
    >
      <v-flex style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
        <h1 style="color:#273232;margin-bottom: 20px; line-height: 32px;">
          Recent Auctions
        </h1>
      </v-flex>
      <v-flex
        v-show="loadingAuctions"
        style="height:100%; padding-bottom:20px;"
        xs12
        sm12
        md12
      >
        <v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
      </v-flex>

      <v-flex
        :key="index"
        v-for="(auction, index) in auctions"
        style="height:100%; padding:30px;"
        xs12
        sm4
        md4
      >
        <v-card>
          <v-card-media :src="auction.image" height="300px">
            <!-- <img height="300px" :src="auction.image" /> -->
          </v-card-media>
          <v-card-title style="text-align:left;" primary-title>
            <div>
              <div class="headline">{{ auction.title }}</div>
              <span class="grey--text"
                >Deed ID: <b>{{ auction.deedId }}</b></span
              ><br />
              <span class="grey--text"
                >Start price: <b>{{ auction.startingPrice }} ETH</b></span
              ><br />
              <span class="grey--text"
                >Expiration date: <b>{{ auction.expirationDate }}</b></span
              ><br />
              <span class="grey--text"
                >Status:
                <b v-show="auction.active" style="color:green">Active</b>
                <b v-show="!auction.active" style="color:red">Inactive</b>
              </span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn
              :disabled="!auction.active"
              @click="openAuction(auction.id)"
              outline
              color="teal"
              flat
              >Bid</v-btn
            >
            <v-btn @click="openAuction(auction.id)" outline color="blue" flat
              >Chat</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-slide-y-transition>
            <!-- <v-card-text>placeholder</v-card-text> -->
          </v-slide-y-transition>
        </v-card>
      </v-flex>
      <v-flex style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
        <v-btn outline color="teal">Load More Auctions</v-btn>
      </v-flex>
    </v-layout>
    <v-layout
      v-show="false"
      style=" color: white; padding: 25px; text-align: center;     background-color: rgb(3, 46, 66);"
      justify-center
      align-center
      row
      wrap
    >
      <v-flex style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
        <h1 style="margin-bottom: 20px; line-height: 32px;">Login as</h1>
        <div style="width: 60%; margin: 0 auto;">
          <v-btn outline color="white">Post an auction</v-btn>
          <v-btn outline color="white">Auctions</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import moment from "moment";
import { AuctionRepository } from "../models/AuctionRepository";
export default {
  data: () => ({
    loadingAuctions: true,
    auctions: []
  }),
  computed: {
    metamaskInstalled() {
      return this.$root.$data.globalState.getMetamaskInstalled();
    }
  },
  methods: {
    openAuction(id) {
      this.$router.push({ name: "Auction", params: { id: id } });
    }
  },

  async mounted() {
    this.$auctionRepoInstance.setAccount("");
    const count = await this.$auctionRepoInstance.getCount();
    for (let i = 0; i < count; i++) {
      let auction = await this.$auctionRepoInstance.findById(i);
      // get metadata
      const swarmResult = await this.$http.get(
        `${this.$config.BZZ_ENDPOINT}/bzz-list:/${auction[3]}`
      );
      let imageUrl = "";
      swarmResult.body.entries.map(entry => {
        if ("contentType" in entry)
          imageUrl = `${this.$config.BZZ_ENDPOINT}/bzz-raw:/${auction[3]}/${entry.path}`;
      });
      this.auctions.push({
        id: i,
        image: imageUrl,
        title: auction[0],
        expirationDate: moment(new Date(auction[1].toNumber() * 1000)).format(
          "dddd, MMMM Do YYYY, h:mm:ss a"
        ),
        startingPrice: web3.utils.fromWei(auction[2].toNumber(), "ether"),
        metadata: auction[3],
        deedId: auction[4].toNumber(),
        deedRepositoryAddress: auction[5],
        owner: auction[6],
        active: auction[7],
        finalized: auction[8]
      });
    }
    this.loadingAuctions = false;
  }
};
</script>
<style></style>
