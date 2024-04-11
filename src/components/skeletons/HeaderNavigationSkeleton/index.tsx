interface IHeaderNavigationSkeleton {
  mobile?: boolean
}

const HeaderNavigationSkeleton = ({
  mobile = false
}: IHeaderNavigationSkeleton) => {
  const renderDesktopNavigationSkeleton = () => {
    const navigationItems = []
    for (let i = 0; i < 4; i++) {
      navigationItems.push(
        <DesktopNavigationItem key={`desktop-navigation-item-${i}`} />
      )
    }
    return navigationItems
  }

  const renderMobileNavigationSkeleton = () => {
    const navigationItems = []
    for (let i = 0; i < 4; i++) {
      navigationItems.push(
        <MobileNavigationItem key={`mobile-navigation-item-${i}`} />
      )
    }
    return navigationItems
  }

  if (!mobile)
    return (
      <div className="flex gap-x-2">{renderDesktopNavigationSkeleton()}</div>
    )

  return <div className="flex gap-x-2">{renderMobileNavigationSkeleton()}</div>
}

export default HeaderNavigationSkeleton

// ============================================== DESKTOP NAVIGATION ITEM

const DesktopNavigationItem = () => {
  return <div className="h-6 w-24 rounded-[4px] bg-gray-300 animate-pulse" />
}

// ============================================== MOBILE NAVIGATION ITEM

const MobileNavigationItem = () => {
  return <div>index</div>
}
