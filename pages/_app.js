import Script from "next/script";

import "../styles/globals.css";

const COLLECTOR_NONPROD = "snowplow-collector-staging.simplybusiness.com";
const COLLECTOR_NONPROD_UK = "snowplow-collector-staging.simplybusiness.co.uk";
const COLLECTOR_PROD = "snowplow-collector.simplybusiness.com";
const COLLECTOR_PROD_UK = "snowplow-collector.simplybusiness.co.uk";

const AVALANCHE_TRACKER_NAME = "sb-ava";
const PV_VALANCHE_TRACKER_NAME = "sb-ava-pv";
const BRONZE_AVALANCHE_TRACKER_NAME = "sb-ava-br";
const APP_ID = "uk-embedded_trade_selector";
const DOMAIN = "simplybusiness.co.uk";
const COLLECTOR_URL = COLLECTOR_NONPROD_UK;
const FALLBACK_SERVICE_CHANNEL_ID = "simplybusiness";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Script
        id="partytown-config"
        data-partytown-config
        dangerouslySetInnerHTML={{
          __html: `
              partytown = {
                lib: "/_next/static/~partytown/",
                debug: true,
                forward: ["snowplow"]
              };
            `,
        }}
      /> */}
      <Script
        id="snowplow-init"
        //strategy="worker"
        dangerouslySetInnerHTML={{
          __html: `
            (function(p, l, o, w, i, n, g) {
              if (!p[i]) {
                p.GlobalSnowplowNamespace = p.GlobalSnowplowNamespace || [];
                p.GlobalSnowplowNamespace.push(i);
                p[i] = function() {
                  (p[i].q = p[i].q || []).push(arguments);
                };
                p[i].q = p[i].q || [];
                n = l.createElement(o);
                g = l.getElementsByTagName(o)[0];
                n.async = 1;
                n.src = w;
                g.parentNode.insertBefore(n, g);
              }
            })(
              window,
              document,
              'script',
              '/sp-2.14.0.js',
              'snowplow',
            )
          `,
        }}
      />
      <Script
        id="snowplow-config"
        //strategy="worker"
        dangerouslySetInnerHTML={{
          __html: `
            window.snowplow("newTracker", "${PV_VALANCHE_TRACKER_NAME}", "${COLLECTOR_URL}", {
              appId: "${APP_ID}",
              eventMethod: "post",
              cookieDomain: "${DOMAIN}",
            });

            window.snowplow(
              "newTracker",
              "${BRONZE_AVALANCHE_TRACKER_NAME}",
              "${COLLECTOR_URL}",
              {
                appId: "${APP_ID}",
                eventMethod: "post",
                cookieDomain: "${DOMAIN}",
              }
            );

            window.snowplow("trackPageView:${PV_VALANCHE_TRACKER_NAME}");
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
