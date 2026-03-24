using System.Text.Json.Serialization;

namespace NEOCIO.Umbraco.Core.Models;

public class FullCalendarEvent
{
    [JsonPropertyName("title")]
    public string? Title { get; set; }

    [JsonPropertyName("start")]
    public string? Start { get; set; } // Changed to string for precise format control

    [JsonPropertyName("end")]
    public string? End { get; set; } // Changed to string for precise format control

    [JsonPropertyName("color")]
    public string? Color { get; set; }

    [JsonPropertyName("textColor")]
    public string? TextColor { get; set; }

    [JsonPropertyName("extendedProps")]
    public EventDetails? ExtendedProps { get; set; }
}

public class EventDetails
{
    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("location")]
    public string? Location { get; set; }
}
