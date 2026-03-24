using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Models.Blocks;

namespace NEOCIO.Umbraco.Components.ViewComponents;

public class BackdropCardViewComponent : ViewComponent
{
    public IViewComponentResult Invoke(BlockListItem model)
    {
        return View(model);
    }
}
