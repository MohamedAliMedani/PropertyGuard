using PropertyGuard.Core.DTOs.Auth;

namespace PropertyGuard.Core.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(LoginDto dto);
    Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
}
