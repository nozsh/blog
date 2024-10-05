llinks_safe = document
  .querySelectorAll("a[href*='?sl']")
  .forEach((llinks_safe) => {
    llinks_safe.setAttribute("rel", "noreferrer nofollow noopener");

    let llinks_safe_href = llinks_safe.href.toString().slice(0, -3);
    llinks_safe.setAttribute("href", "https://href.li/?" + llinks_safe_href);
  });

llinks_moredetail = document
  .querySelectorAll("a[href*='?nt']")
  .forEach((llinks_moredetail) => {
    llinks_moredetail.setAttribute("target", "moredetail");
    llinks_moredetail.setAttribute("rel", "noreferrer nofollow noopener");

    let llinks_moredetail_href = llinks_moredetail.href.toString().slice(0, -3);
    llinks_moredetail.setAttribute(
      "href",
      "https://href.li/?" + llinks_moredetail_href
    );
  });
