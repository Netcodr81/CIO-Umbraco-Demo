using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Models.Blocks;

namespace NEOCIO.Umbraco.Components.ViewComponents;

public class SocialLinkViewComponent : ViewComponent
{
    public IViewComponentResult Invoke(BlockListItem model)
    {
        return View(model);
    }
}
