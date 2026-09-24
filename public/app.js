// Feature filter chips on ranked lists.
document.querySelectorAll('.filters').forEach((group) => {
  const list = group.parentElement.querySelector('.rank-list');
  group.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    group.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c === chip));
    const f = chip.dataset.filter;
    list.querySelectorAll('.rank-card').forEach((card) => {
      card.hidden = f !== 'all' && !card.dataset.tags.split(',').includes(f);
    });
  });
});
