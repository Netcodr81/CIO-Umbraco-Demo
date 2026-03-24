using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Models.Blocks;

namespace NEOCIO.Umbraco.Components.ViewComponents;

public class Layout8ViewComponent : ViewComponent
{
    public IViewComponentResult Invoke(BlockGridItem model)
    {
        return View(model);
    }
}
