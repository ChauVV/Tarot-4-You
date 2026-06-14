import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCredits } from '../context/CreditsContext'
import { useLang } from '../context/LanguageContext'
import { showRewardedAd } from '../utils/rewardedAd'

export default function CreditsPanel() {
  const { isPanelOpen, closePanel, addCredits, credits } = useCredits()
  const { lang } = useLang()
  const [watchingAd, setWatchingAd] = useState(false)
  const [adError, setAdError] = useState(false)

  // reset transient state whenever the panel closes
  useEffect(() => {
    if (!isPanelOpen) {
      setWatchingAd(false)
      setAdError(false)
    }
  }, [isPanelOpen])

  const watchAd = async () => {
    setAdError(false)
    setWatchingAd(true)
    try {
      const result = await showRewardedAd()
      setWatchingAd(false)
      if (result === 'granted') {
        addCredits(5)
        closePanel()
      }
      // 'dismissed' → user closed early, no reward, panel stays open
    } catch {
      // not configured / no fill / load failure
      setWatchingAd(false)
      setAdError(true)
    }
  }

  const takeFree = () => {
    addCredits(1)
    closePanel()
  }

  const noCredits = credits === 0

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <>
          <motion.div
            className="credits-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!watchingAd ? closePanel : undefined}
          />
          <motion.div
            className="credits-panel"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {watchingAd ? (
              <div className="credits-panel-ad">
                <div className="credits-ad-spinner" />
                <p className="credits-ad-label">
                  {lang === 'vi' ? 'Đang tải quảng cáo…' : 'Loading ad…'}
                </p>
                <p className="credits-ad-reward">
                  {lang === 'vi' ? '+5 lượt sau khi xem xong' : '+5 readings when finished'}
                </p>
              </div>
            ) : (
              <>
                <div className="credits-panel-header">
                  <span className="credits-panel-icon">✦</span>
                  <h3 className="credits-panel-title">
                    {noCredits
                      ? lang === 'vi' ? 'Hết lượt đọc bài' : 'Out of readings'
                      : lang === 'vi' ? 'Thêm lượt đọc bài' : 'Get more readings'}
                  </h3>
                  {noCredits && !adError && (
                    <p className="credits-panel-sub">
                      {lang === 'vi'
                        ? 'Bạn đã dùng hết lượt. Chọn một trong hai cách bên dưới để tiếp tục.'
                        : "You've used all your readings. Choose an option below to continue."}
                    </p>
                  )}
                  {adError && (
                    <p className="credits-panel-sub">
                      {lang === 'vi'
                        ? 'Hiện chưa có quảng cáo. Vui lòng thử lại sau.'
                        : 'No ad available right now. Please try again later.'}
                    </p>
                  )}
                </div>

                <div className="credits-panel-actions">
                  <button className="credits-btn credits-btn-ad" onClick={watchAd}>
                    <span className="credits-btn-icon">📺</span>
                    <span className="credits-btn-text">
                      <strong>
                        {lang === 'vi' ? 'Xem quảng cáo' : 'Watch an ad'}
                      </strong>
                      <small>
                        {lang === 'vi' ? 'Nhận 5 lượt miễn phí' : 'Get 5 free readings'}
                      </small>
                    </span>
                    <span className="credits-btn-badge">+5</span>
                  </button>

                  <button className="credits-btn credits-btn-free" onClick={takeFree}>
                    <span className="credits-btn-icon">🎁</span>
                    <span className="credits-btn-text">
                      <strong>
                        {lang === 'vi' ? 'Không, cảm ơn' : 'No thanks'}
                      </strong>
                      <small>
                        {lang === 'vi' ? 'Nhận 1 lượt miễn phí' : 'Get 1 free reading'}
                      </small>
                    </span>
                    <span className="credits-btn-badge credits-btn-badge--dim">+1</span>
                  </button>
                </div>

                {!noCredits && (
                  <button className="credits-panel-dismiss" onClick={closePanel}>
                    {lang === 'vi' ? 'Đóng' : 'Close'}
                  </button>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
