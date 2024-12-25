import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => (
   <ContentLoader
      speed={2}
      width={280}
      height={480}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
   >
      <circle cx="137" cy="120" r="120" />
      <rect x="20" y="258" rx="5" ry="5" width="240" height="20" />
      <rect x="0" y="300" rx="10" ry="10" width="280" height="88" />
      <rect x="0" y="414" rx="10" ry="10" width="120" height="28" />
      <rect x="132" y="405" rx="10" ry="10" width="149" height="47" />
   </ContentLoader>
)

export default Skeleton
