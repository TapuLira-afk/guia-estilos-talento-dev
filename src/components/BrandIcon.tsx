import { useEffect } from "react"

const assetPathPrefix = "/assets"
const imgPenguinBody = `${assetPathPrefix}/17594.svg`
const imgEyes = `${assetPathPrefix}/2c7d7.svg`
const imgBeak = `${assetPathPrefix}/a9d74.svg`
const imgFeet = `${assetPathPrefix}/8cb0a.svg`
const roleIcons: Record<string, { cap: string code: string }> = {
  admin: {
    cap: `${assetPathPrefix}/48ba9.svg`,
    code: `${assetPathPrefix}/bd158.svg`,
  },
  recruiter: {
    cap: `${assetPathPrefix}/2d2ce.svg`,
    code: `${assetPathPrefix}/a3312.svg`,
  },
  candidate: {
    cap: `${assetPathPrefix}/6d662.svg`,
    code: `${assetPathPrefix}/0bcd9.svg`,
  },
}

export function BrandIcon({
  role,
  className = "brand-icon",
}: {
  role: string
  className?: string
}) {
  const { cap, code } = roleIcons[role] ?? roleIcons.admin
  return (
    <span
      className={` relative inline-block overflow-clip shrink-0 ${className}`}
      aria-hidden="true"
    >
      <span className="absolute inset-[15.63%_12.58%_7.42%_12.58%]">
        <img
          alt=""
          className="absolute block inset-0 max-w-none size-full"
          src={imgPenguinBody}
        />
      </span>
      <span className="absolute inset-[28.13%_33.2%_59.38%_33.2%]">
        <img
          alt=""
          className="absolute block inset-0 max-w-none size-full"
          src={imgEyes}
        />
      </span>
      <span className="absolute inset-[44.14%_42.97%_46.48%_42.97%]">
        <img
          alt=""
          className="absolute block inset-0 max-w-none size-full"
          src={imgBeak}
        />
      </span>
      <span className="absolute inset-[87.5%_29.22%_5.47%_29.22%]">
        <img
          alt=""
          className="absolute block inset-0 max-w-none size-full"
          src={imgFeet}
        />
      </span>
      <span className="absolute inset-[5.08%_19.53%_71.88%_21.48%]">
        <img
          alt=""
          className="absolute block inset-0 max-w-none size-full"
          src={cap}
        />
      </span>
      <span className="absolute inset-[63.67%_37.11%_23.05%_37.11%]">
        <span className="absolute inset-[-7.35%_-3.79%]">
          <img alt="" className="block max-w-none size-full" src={code} />
        </span>
      </span>
    </span>
  )
}

export function useProfileFavicon(profile: string) {
  useEffect(() => {
    const { cap, code } = roleIcons[profile] ?? roleIcons.admin
    const layers: [string, number, number, number, number][] = [
      [imgPenguinBody, 0.1258, 0.1563, 1 - 0.2516, 1 - 0.2305],
      [imgEyes, 0.332, 0.2813, 1 - 0.664, 1 - 0.8751],
      [imgBeak, 0.4297, 0.4414, 1 - 0.8594, 1 - 0.9062],
      [imgFeet, 0.2922, 0.875, 1 - 0.5844, 1 - 0.9297],
      [cap, 0.2148, 0.0508, 1 - 0.4101, 1 - 0.7696],
      [
        code,
        0.3711 - 0.2578 * 0.0379,
        0.6367 - 0.1328 * 0.0735,
        0.2578 * 1.0758,
        0.1328 * 1.147,
      ],
    ]
    Promise.all(
      layers.map(
        ([src]) =>
          new Promise<HTMLImageElement>((res, rej) => {
            const im = new Image()
            im.onload = () => res(im)
            im.onerror = rej
            im.src = src
          }),
      ),
    )
      .then((imgs) => {
        const cv = document.createElement("canvas")
        cv.width = 64
        cv.height = 64
        const ctx = cv.getContext("2d")
        if (!ctx) return
        layers.forEach(([, x, y, w, h], i) =>
          ctx.drawImage(imgs[i], x * 64, y * 64, w * 64, h * 64),
        )
        let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']")
        if (!link) {
          link = document.createElement("link")
          link.rel = "icon"
          document.head.appendChild(link)
        }
        link.type = "image/png"
        link.href = cv.toDataURL("image/png")
      })
      .catch(() => {})
  }, [profile])
}
