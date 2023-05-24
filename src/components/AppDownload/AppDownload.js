import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@blueprintjs/core'

import config from 'var/electronVersion'
import { getOS, PLATFORMS } from 'utils/getOS'

const {
  getElectronReleaseLink,
  DEFAULT_ELECTRON_VERSION,
  LATEST_ELECTRON_RELEASE_LINK,
} = config

const getData = (version) => {
  const platform = getOS()

  console.log('+++platform', platform)

  switch (platform) {
    case PLATFORMS.mac:
      return {
        text: 'header.mac',
        link: getElectronReleaseLink({ version, platform, ext: 'zip' }),
      }
    case PLATFORMS.windows:
      return {
        text: 'header.windows',
        link: getElectronReleaseLink({ version, platform, ext: 'exe' }),
      }
    case PLATFORMS.linux:
    default:
      return {
        text: 'header.linux',
        link: getElectronReleaseLink({ version, platform, ext: 'AppImage.zip' }),
      }
  }
}

const AppDownload = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [latestElectronVersion, setLatestElectronVersion] = useState(DEFAULT_ELECTRON_VERSION)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(LATEST_ELECTRON_RELEASE_LINK)
      const json = await data.json()
      const latestVersion = json?.tag_name
      if (latestVersion) {
        setLatestElectronVersion(latestVersion)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const { text, link } = getData(latestElectronVersion)

  return (
    <Button
      className='lp-header-install-btn'
      onClick={() => {
        window.open(link)
      }}
      loading={isLoading}
    >
      {t(text)}
    </Button>
  )
}


export default AppDownload
