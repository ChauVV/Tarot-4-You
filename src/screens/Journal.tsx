import Layout from '../components/Layout'
import { useLang } from '../context/LanguageContext'
import { useJournal } from '../hooks/useJournal'
import { getCard } from '../data/cards'
import { getSpread, TOPICS } from '../data/spreads'
import type { Topic } from '../types'

function topicLabel(id: Topic, lang: 'vi' | 'en') {
  const tp = TOPICS.find((x) => x.id === id)
  return tp ? tp.label[lang] : id
}

export default function Journal() {
  const { t, bi, lang } = useLang()
  const { entries, remove, clear } = useJournal()

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

  return (
    <Layout showBack>
      <div className="screen">
        <div className="journal-head">
          <h2 className="screen-title">{t('journal')}</h2>
          {entries.length > 0 && (
            <button
              className="btn btn-ghost small"
              onClick={() => {
                if (window.confirm(t('confirmClear'))) clear()
              }}
            >
              {t('clearAll')}
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <p className="empty-state">{t('journalEmpty')}</p>
        ) : (
          <ul className="journal-list">
            {entries.map((e) => {
              const spread = getSpread(e.spreadId)
              return (
                <li key={e.id} className="journal-entry">
                  <div className="entry-meta">
                    <span className="entry-date">{fmt(e.date)}</span>
                    <span className="entry-topic">{topicLabel(e.topic, lang)}</span>
                  </div>
                  {e.question.trim() && <p className="entry-question">“{e.question.trim()}”</p>}
                  {spread && <p className="entry-spread">{bi(spread.name)}</p>}

                  <div className="entry-cards">
                    {e.cards.map((c, i) => {
                      const card = getCard(c.cardId)
                      if (!card) return null
                      return (
                        <figure key={i} className="entry-card">
                          <img
                            src={card.image}
                            alt={bi(card.name)}
                            style={{ transform: c.reversed ? 'rotate(180deg)' : undefined }}
                          />
                          <figcaption>
                            {bi(card.name)}
                            <span className={c.reversed ? 'rev' : 'up'}>
                              {' '}
                              · {c.reversed ? t('reversed') : t('upright')}
                            </span>
                          </figcaption>
                        </figure>
                      )
                    })}
                  </div>

                  <button className="btn btn-ghost small danger" onClick={() => remove(e.id)}>
                    {t('delete')}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Layout>
  )
}
